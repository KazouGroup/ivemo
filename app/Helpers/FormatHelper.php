<?php

namespace App\Helpers;

use XmlParser;

class FormatHelper
{
    // --------------------------------------------------------------------------

    /**
     * Return the number formatted with two decimals and the dot '.' as decimal
     * separator and the comma ',' as thousand separator.
     *
     * Examples:
     *
     *   0 ==> 0.00
     *   1000 ==> 1,000.00
     *   123.456 ==> 123.47
     *
     * @param $value
     * @return (String)
     */
    public static function currency($value)
    {
        return number_format($value, 2, '.', ',');
    }

    // --------------------------------------------------------------------------

    /**
     * Return the number formatted with two decimals and the dot '.' as decimal
     * separator but without the thousand separator. This format avoid errors
     * on type conversions from string to numbers.
     *
     * Examples:
     *
     *   0 ==> 0.00
     *   1000 ==> 1000.00
     *   123.456 ==> 123.47
     *
     * @param $value
     * @return (String)
     */
    public static function currencySafe($value)
    {
        return number_format($value, 2, '.', '');
    }

    // --------------------------------------------------------------------------

    /**
     * Change the format for the given string value.
     *
     * Example usage:
     *
     *   FormatHelper::changeDateFormat('10/07/2015', 'd/m/Y', 'Y-m-d')
     *
     * @param (String) $date
     * @param (String) $from
     * @param (String) $to Default value is 'Y-m-d'
     * @param (String) $date
     * @return (String) Returns null if the conversion fails.
     */
    public static function changeDateFormat($date, $from, $to)
    {
        $dateTime = \DateTime::createFromFormat($from, $date);
        if ($dateTime === false) {
            return null;
        }
        return $dateTime->format($to);
    }

    // --------------------------------------------------------------------------

    /**
     * Return the date in the format: d/m/Y.
     *
     * @param $dateTime (String) as returned from mysql: Y-m-d H:i:s for date
     * time, or Y-m-d for date.
     * @return (String)
     */
    public static function date($dateTime)
    {
        return date("d/m/Y", strtotime($dateTime));
    }

    // --------------------------------------------------------------------------

    /**
     * Return the given string truncated on $length characters and with '...'
     * appended at the end.
     *
     * @param $value (String)
     * @param $lentgh (Integer) Optional.
     * @return (String)
     */
    public static function ellipsis($value, $length = 100)
    {
        if (strlen($value) <= $length) {
            return $value;
        }
        return substr($value, 0, $length - 3) . '...';
    }

    // --------------------------------------------------------------------------

    /**
     * Return the number formatted for showing a float number value: with two
     * decimals and the dot '.' as decimal separator and the comma ',' as
     * thousand separator.
     *
     * @param $value
     * @return (String)
     */
    public static function float($value)
    {
        $floatValue = floatval($value);
        return number_format(round($floatValue, 2), 2, '.', ',');
    }

    // --------------------------------------------------------------------------

    /**
     * Return the number formatted without decimals, with a comma ',' as
     * thousand separator.
     *
     * @param $value
     * @return (String)
     */
    public static function integer($value)
    {
        return number_format($value, 0, '.', ',');
    }

    // --------------------------------------------------------------------------

    /**
     * Return a string representation that can be "safely" converted to a number,
     * removing any comma (',') as thousand separator and leaving the dot ('.')
     * as decimal separator.
     *
     * Examples:
     *
     *   "0.00" ==> "0.00"
     *   "1,000.00" ==> "1000.00"
     *   "1,000,000" ==> "1000000"
     *
     * @param $value (String)
     * @return (String)
     */
    public static function normNum($value)
    {
        return str_replace(',', '', $value);
    }

    // --------------------------------------------------------------------------

    /**
     * Return a string representation that can be "safely" converted to a number,
     * removing any comma (',') as thousand separator and leaving the dot ('.')
     * as decimal separator.
     *
     * Examples:
     *
     *   "0.00" ==> "0.00"
     *   "1,000.00" ==> "1000.00"
     *   "1,000,000" ==> "1000000"
     *
     * @param $value (String)
     * @return (String)
     */
    public static function currNum($value)
    {
        return str_replace(',', '.', $value);
    }

    // --------------------------------------------------------------------------

    /**
     * Return the time in the format: H:i (i.e. hours:min).
     *
     * @param $dateTime (String) as returned from mysql: Y-m-d H:i:s for date
     * time, or H:i:s for time.
     * @return (String) Returns null if the conversion fails.
     */
    public static function time($dateTime)
    {
        if (empty($dateTime)) {
            return null;
        }

        $res = null;
        try {
            $dateTimeVal = new \DateTime($dateTime);
            $res = $dateTimeVal->format('H:i');
        }
        catch (\Exception $ex) { }

        return $res;
    }

    // --------------------------------------------------------------------------

    /**
     * Return the hours as integer if they don't have decimal
     *
     * @param $hours (String) as returned from mysql: Y-m-d H:i:s for date
     * time, or H:i:s for time.
     * @return (String) Returns null if the conversion fails.
     */
    public static function hours($hours)
    {
        if ( $hours===number_format(floor($hours),1) )
            return number_format($hours);
        else
            return $hours;
    }

    public static function xml($str, $addRoot = false)
    {
        $res = [
            'xml' => null,
            'success' => true,
            'error' => null,
        ];

        if($addRoot)
            $str = '<root>' . $str . '</root>';

        try {
            $res['xml'] = XmlParser::extract($str)->getContent();
        } catch(\Exception $e) {
            $res['xml'] = null;
            $res['success'] = false;
            $res['error'] = $e->getMessage();
        }
        return $res;
    }

    // --------------------------------------------------------------------------

} // class
